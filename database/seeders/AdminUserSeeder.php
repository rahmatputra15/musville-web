<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Super Admin
        $superAdmin = User::firstOrCreate(
            ['email' => 'superadmin@musville.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password'),
                'phone' => '081234567890',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );
        $superAdmin->assignRole('super-admin');

        // Create Admin
        $admin = User::firstOrCreate(
            ['email' => 'admin@musville.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
                'phone' => '081234567891',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );
        $admin->assignRole('admin');

        // Create Editor
        $editor = User::firstOrCreate(
            ['email' => 'editor@musville.com'],
            [
                'name' => 'Editor',
                'password' => Hash::make('password'),
                'phone' => '081234567892',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );
        $editor->assignRole('editor');

        $this->command->info('Admin users created successfully!');
        $this->command->info('Super Admin - Email: superadmin@musville.com | Password: password');
        $this->command->info('Admin - Email: admin@musville.com | Password: password');
        $this->command->info('Editor - Email: editor@musville.com | Password: password');
    }
}
