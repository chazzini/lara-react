<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name'=>'post_view']);
        Permission::create(['name'=>'post_edit']);
        Permission::create(['name'=>'post_create']);
        Permission::create(['name'=>'post_delete']);
    }
}