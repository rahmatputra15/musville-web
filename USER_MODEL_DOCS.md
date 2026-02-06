# User Model Documentation

## Overview
User model telah dikonfigurasi dengan Spatie Role & Permission untuk sistem manajemen admin website Musville.

## Database Schema

### Users Table
- `id` - Primary key
- `name` - Nama lengkap user
- `email` - Email (unique)
- `password` - Password (hashed)
- `phone` - Nomor telepon (nullable)
- `avatar` - Path avatar image (nullable)
- `is_active` - Status aktif user (boolean, default: true)
- `last_login_at` - Timestamp login terakhir (nullable)
- `email_verified_at` - Timestamp verifikasi email (nullable)
- `remember_token` - Token remember me
- `created_at` - Timestamp dibuat
- `updated_at` - Timestamp diupdate

## Roles & Permissions

### Available Roles
1. **super-admin** - Full access ke semua fitur
2. **admin** - Akses manajemen user dan project
3. **editor** - Akses edit content dan project
4. **viewer** - Hanya bisa melihat data

### Available Permissions
**User Management:**
- view users
- create users
- edit users
- delete users

**Project Management:**
- view projects
- create projects
- edit projects
- delete projects
- publish projects

**Content Management:**
- view content
- create content
- edit content
- delete content

**Settings:**
- view settings
- edit settings

**Reports:**
- view reports
- export reports

**Roles & Permissions:**
- manage roles
- manage permissions

## Default Admin Accounts

Setelah menjalankan `php artisan migrate:fresh --seed`, tersedia 3 akun admin:

1. **Super Admin**
   - Email: superadmin@musville.com
   - Password: password
   - Role: super-admin (All permissions)

2. **Admin**
   - Email: admin@musville.com
   - Password: password
   - Role: admin

3. **Editor**
   - Email: editor@musville.com
   - Password: password
   - Role: editor

## Usage Examples

### Check User Role
```php
// Check if user has specific role
if ($user->hasRole('admin')) {
    // User is admin
}

// Check if user has any of the roles
if ($user->hasAnyRole(['admin', 'super-admin'])) {
    // User is admin or super admin
}

// Helper methods
if ($user->isAdmin()) {
    // User is admin
}

if ($user->isSuperAdmin()) {
    // User is super admin
}
```

### Check User Permission
```php
// Check if user has specific permission
if ($user->can('edit projects')) {
    // User can edit projects
}

// Check if user has any of the permissions
if ($user->hasAnyPermission(['create projects', 'edit projects'])) {
    // User can create or edit projects
}
```

### Assign Role to User
```php
// Assign single role
$user->assignRole('admin');

// Assign multiple roles
$user->assignRole(['admin', 'editor']);

// Sync roles (remove old roles and add new ones)
$user->syncRoles(['admin']);
```

### Give Permission to User
```php
// Give single permission
$user->givePermissionTo('edit projects');

// Give multiple permissions
$user->givePermissionTo(['edit projects', 'create projects']);
```

### Get User Avatar
```php
// Get avatar URL (returns default avatar if not set)
$avatarUrl = $user->avatar_url;
```

## Middleware Usage

### Protect Routes with Role
```php
// In web.php
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
});

// Multiple roles
Route::middleware(['auth', 'role:admin|super-admin'])->group(function () {
    Route::get('/admin/users', [UserController::class, 'index']);
});
```

### Protect Routes with Permission
```php
// In web.php
Route::middleware(['auth', 'permission:edit projects'])->group(function () {
    Route::put('/admin/projects/{id}', [ProjectController::class, 'update']);
});

// Multiple permissions
Route::middleware(['auth', 'permission:create projects|edit projects'])->group(function () {
    Route::get('/admin/projects/form', [ProjectController::class, 'form']);
});
```

### In Controller
```php
public function __construct()
{
    $this->middleware('auth');
    $this->middleware('role:admin');
    // or
    $this->middleware('permission:edit users');
}
```

### In Blade/Inertia Components
```php
// Check role
@role('admin')
    // Show admin content
@endrole

// Check permission
@can('edit projects')
    // Show edit button
@endcan
```

## Seeder Commands

### Run all seeders
```bash
php artisan db:seed
```

### Run specific seeder
```bash
php artisan db:seed --class=RolePermissionSeeder
php artisan db:seed --class=AdminUserSeeder
```

### Fresh migration with seed
```bash
php artisan migrate:fresh --seed
```

## Notes

⚠️ **Important:**
- Super admin memiliki akses ke semua permission
- Jangan lupa ubah password default setelah deploy
- Gunakan `is_active` untuk soft disable user tanpa delete
- Avatar disimpan di storage/app/public/avatars
- Default avatar menggunakan UI Avatars API
