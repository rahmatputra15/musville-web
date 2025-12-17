# Login Mechanism Documentation

## Overview
Mekanisme autentikasi lengkap untuk aplikasi Musville menggunakan Laravel Inertia dengan Spatie Permission.

## Files Created/Modified

### 1. Controller
**File:** `app/Http/Controllers/Auth/LoginController.php`
- `create()` - Menampilkan halaman login
- `store()` - Handle proses login dan validasi
- `destroy()` - Handle logout

### 2. Routes
**File:** `routes/web.php`
```php
// Guest Routes (hanya untuk user yang belum login)
Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'create'])->name('login');
    Route::post('/login', [LoginController::class, 'store'])->name('login.store');
});

// Authenticated Routes
Route::post('/logout', [LoginController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

// Admin Dashboard (Protected dengan role)
Route::middleware(['auth', 'role:super-admin|admin|editor'])->group(function () {
    Route::get('/dashboard', ...)->name('dashboard');
});
```

### 3. Middleware
**File:** `app/Http/Middleware/HandleInertiaRequests.php`
- Share data `auth.user` ke semua komponen Inertia
- Share `flash` messages untuk notifikasi

### 4. Frontend
**File:** `resources/js/pages/Auth/Login.jsx`
- Form login dengan validasi
- Show/hide password
- Remember me checkbox
- Error handling
- Flash notifications
- Responsive design

**File:** `resources/js/components/Dashboard/DashboardNavbar.jsx`
- Display user info dari auth
- Logout button
- User dropdown menu

## How It Works

### Login Flow
1. User mengakses `/login`
2. User input email & password
3. Form di-submit ke `/login` (POST)
4. `LoginController@store` melakukan:
   - Validasi input
   - Attempt authentication
   - Check if user active
   - Update last_login_at
   - Regenerate session
   - Redirect based on role

### Role-Based Redirect
```php
if ($user->hasRole(['super-admin', 'admin', 'editor'])) {
    return redirect()->intended('/dashboard');
}
return redirect()->intended('/');
```

### Logout Flow
1. User click logout button
2. POST request ke `/logout`
3. `LoginController@destroy` melakukan:
   - Logout user
   - Invalidate session
   - Regenerate CSRF token
   - Redirect to home

## Usage Examples

### Login Form
```jsx
const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
    remember: false,
});

const handleSubmit = (e) => {
    e.preventDefault();
    post(route('login.store'), {
        onError: () => {
            reset('password');
        }
    });
};
```

### Logout Button
```jsx
const handleLogout = () => {
    router.post(route('logout'));
};
```

### Accessing Auth Data
```jsx
const { auth } = usePage().props;

// Check if logged in
if (auth.user) {
    console.log(auth.user.name);
    console.log(auth.user.roles);
    console.log(auth.user.is_admin);
}
```

### Protected Route
```jsx
// In any component
const { auth } = usePage().props;

if (!auth.user) {
    return <Navigate to="/login" />;
}

// Check role
if (!auth.user.is_admin) {
    return <div>Unauthorized</div>;
}

// Check permission
if (!auth.user.permissions.includes('edit projects')) {
    return <div>No Permission</div>;
}
```

## Available Auth Properties

```javascript
auth: {
    user: {
        id: 1,
        name: "Super Admin",
        email: "superadmin@musville.com",
        avatar: "https://...",
        roles: ["super-admin"],
        permissions: ["view users", "create users", ...],
        is_admin: true,
        is_super_admin: true
    }
}
```

## Flash Messages

### Set Flash in Controller
```php
return redirect('/dashboard')->with('success', 'Login successful!');
return redirect('/login')->with('error', 'Invalid credentials');
```

### Display Flash in Component
```jsx
const { flash } = usePage().props;

useEffect(() => {
    if (flash?.success) {
        // Show success notification
    }
    if (flash?.error) {
        // Show error notification
    }
}, [flash]);
```

## Security Features

1. **CSRF Protection** - Laravel built-in
2. **Session Regeneration** - Mencegah session fixation
3. **Password Hashing** - Bcrypt with salt
4. **Active User Check** - User harus active untuk login
5. **Role-Based Access** - Route protection dengan Spatie
6. **Remember Me** - Secure persistent login

## Testing Login

### Test Accounts
```
Super Admin:
Email: superadmin@musville.com
Password: password

Admin:
Email: admin@musville.com
Password: password

Editor:
Email: editor@musville.com
Password: password
```

### Manual Test Steps
1. Akses `http://localhost:8000/login`
2. Input credentials salah satu akun di atas
3. Click "Sign In"
4. Akan redirect ke `/dashboard` jika role admin/editor
5. Check navbar untuk melihat user info
6. Click logout untuk test logout

### Test Protected Route
```bash
# Akses dashboard tanpa login (should redirect to login)
curl http://localhost:8000/dashboard

# Login dulu
curl -X POST http://localhost:8000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@musville.com","password":"password"}'

# Sekarang bisa akses dashboard
```

## Middleware Protection

### Protect Single Route
```php
Route::get('/admin/users', [UserController::class, 'index'])
    ->middleware(['auth', 'role:admin']);
```

### Protect Route Group
```php
Route::middleware(['auth', 'role:super-admin|admin'])->group(function () {
    Route::resource('users', UserController::class);
    Route::resource('projects', ProjectController::class);
});
```

### Permission-Based Protection
```php
Route::middleware(['auth', 'permission:edit projects'])->group(function () {
    Route::put('/projects/{id}', [ProjectController::class, 'update']);
});
```

## Troubleshooting

### Error: "The provided credentials do not match our records"
- Check email dan password
- Pastikan user ada di database
- Check password hash di database

### Error: "Your account has been deactivated"
- User.is_active = false
- Update di database: `UPDATE users SET is_active = 1 WHERE email = 'user@email.com'`

### Redirect Loop
- Check middleware di routes
- Pastikan guest middleware di login route
- Check auth middleware di protected routes

### Session Not Persisting
- Check SESSION_DRIVER di .env
- Run `php artisan config:clear`
- Check storage/framework/sessions permission

### CSRF Token Mismatch
- Run `php artisan config:clear`
- Clear browser cookies
- Check @csrf di form atau Inertia setup

## Next Steps

1. ✅ Login mechanism created
2. 🔄 Add "Forgot Password" functionality
3. 🔄 Add email verification
4. 🔄 Add two-factor authentication
5. 🔄 Add login activity log
6. 🔄 Add password strength requirements
7. 🔄 Add rate limiting for login attempts

## Related Documentation
- [USER_MODEL_DOCS.md](USER_MODEL_DOCS.md) - User model & roles
- [Spatie Permission Docs](https://spatie.be/docs/laravel-permission)
- [Inertia.js Docs](https://inertiajs.com)
