<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // User Management
            'view users',
            'create users',
            'edit users',
            'delete users',

            // Project Management
            'view projects',
            'create projects',
            'edit projects',
            'delete projects',
            'publish projects',

            // Content Management
            'view content',
            'create content',
            'edit content',
            'delete content',

            // Settings
            'view settings',
            'edit settings',

            // Reports
            'view reports',
            'export reports',

            // Roles & Permissions
            'manage roles',
            'manage permissions',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }

        // Create Super Admin Role
        $superAdmin = Role::firstOrCreate(['name' => 'super-admin', 'guard_name' => 'web']);
        $superAdmin->givePermissionTo(Permission::all());

        // Create Admin Role
        $admin = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $admin->givePermissionTo([
            'view users',
            'create users',
            'edit users',
            'view projects',
            'create projects',
            'edit projects',
            'publish projects',
            'view content',
            'create content',
            'edit content',
            'view settings',
            'view reports',
            'export reports',
        ]);

        // Create Editor Role
        $editor = Role::firstOrCreate(['name' => 'editor', 'guard_name' => 'web']);
        $editor->givePermissionTo([
            'view projects',
            'create projects',
            'edit projects',
            'view content',
            'create content',
            'edit content',
        ]);

        // Create Viewer Role
        $viewer = Role::firstOrCreate(['name' => 'viewer', 'guard_name' => 'web']);
        $viewer->givePermissionTo([
            'view users',
            'view projects',
            'view content',
            'view settings',
            'view reports',
        ]);

        $this->command->info('Roles and Permissions created successfully!');
    }
}