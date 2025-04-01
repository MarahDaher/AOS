<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;


use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;

// Route::get('/fresh-migrate', function () {
//     Artisan::call('migrate:fresh', ['--force' => true]);
//     $output1 = Artisan::output();

//     Artisan::call('db:seed', ['--force' => true]);
//     $output2 = Artisan::output();

//     return nl2br("✅ Fresh migration complete!\n\n--- MIGRATE OUTPUT ---\n$output1\n\n--- SEED OUTPUT ---\n$output2");
// });



Route::get('/clear', function () {
    Artisan::call('config:clear');
    Artisan::call('route:clear');
    Artisan::call('cache:clear');
    return '✅ Laravel cache cleared';
});
