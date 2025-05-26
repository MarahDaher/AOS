<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;


use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Schema;


Route::get('/force-clear-config', function () {
    Artisan::call('config:clear');
    Artisan::call('cache:clear');
    return '✅ Config and Cache Cleared!';
});

Route::get('/clear', function () {
    $outputText = "";

    Artisan::call('config:clear');
    $outputText .= "✅ Config cache cleared.\n";

    Artisan::call('route:clear');
    $outputText .= "✅ Route cache cleared.\n";

    Artisan::call('cache:clear');
    $outputText .= "✅ Application cache cleared.\n";

    // try {
    //     Artisan::call('storage:link');
    //     $linkOutput = Artisan::output();
    //     $outputText .= "✅ Storage symlink created successfully.\n$linkOutput\n";
    // } catch (\Exception $e) {
    //     $outputText .= "❌ Failed to create storage link. Error: " . $e->getMessage() . "\n";
    // }

    // Artisan::call('migrate:refresh');


    // ✅ Safer migrate without fresh
    Artisan::call('migrate:fresh', ['--force' => true]);
    $migrateOutput = Artisan::output();
    $outputText .= "✅ Migrations complete.\n$migrateOutput\n";

    Artisan::call('db:seed', ['--force' => true]);
    $seedOutput = Artisan::output();
    $outputText .= "✅ Database seeded successfully.\n$seedOutput\n";

    return nl2br($outputText);
});
