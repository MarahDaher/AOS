<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;


use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;

Route::get('/fresh-migrate', function () {
    Artisan::call('migrate:fresh', ['--force' => true]);
    $output1 = Artisan::output();

    Artisan::call('db:seed', ['--force' => true]);
    $output2 = Artisan::output();

    return nl2br("✅ Fresh migration complete!\n\n--- MIGRATE OUTPUT ---\n$output1\n\n--- SEED OUTPUT ---\n$output2");
});



Route::get('/clear', function () {
    $outputText = "";

    // Clear config, route, and cache
    Artisan::call('config:clear');
    $outputText .= "✅ Config cache cleared.\n";

    Artisan::call('route:clear');
    $outputText .= "✅ Route cache cleared.\n";

    Artisan::call('cache:clear');
    $outputText .= "✅ Application cache cleared.\n";

    // Create storage symlink
    try {
        Artisan::call('storage:link');
        $linkOutput = Artisan::output();
        $outputText .= "✅ Storage symlink created successfully.\n$linkOutput\n";
    } catch (\Exception $e) {
        $outputText .= "❌ Failed to create storage link. Error: " . $e->getMessage() . "\n";
    }

    // Fresh migrate
    Artisan::call('migrate:fresh', ['--force' => true]);
    $migrateOutput = Artisan::output();
    $outputText .= "✅ Fresh migration complete.\n$migrateOutput\n";

    // Seed database
    Artisan::call('db:seed', ['--force' => true]);
    $seedOutput = Artisan::output();
    $outputText .= "✅ Database seeded successfully.\n$seedOutput\n";

    // Final response
    return nl2br($outputText); // Display with line breaks
});
