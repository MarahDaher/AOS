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


// Route::get('/clear', function () {
//     $outputText = "";

//     // Clear config, route, and cache
//     Artisan::call('config:clear');
//     $outputText .= "✅ Maa Config cache cleared.\n";

//     Artisan::call('route:clear');
//     $outputText .= "✅ Route cache cleared.\n";

//     Artisan::call('cache:clear');
//     $outputText .= "✅ Application cache cleared.\n";

//     // Create storage symlink
//     try {
//         Artisan::call('storage:link');
//         $linkOutput = Artisan::output();
//         $outputText .= "✅ Storage symlink created successfully.\n$linkOutput\n";
//     } catch (\Exception $e) {
//         $outputText .= "❌ Failed to create storage link. Error: " . $e->getMessage() . "\n";
//     }

//     // Force Drop table sessions if exists 🔥
//     try {
//         Schema::disableForeignKeyConstraints();
//         if (Schema::hasTable('sessions')) {
//             Schema::drop('sessions');
//             $outputText .= "✅ 'sessions' table dropped manually.\n";
//         }
//         Schema::enableForeignKeyConstraints();
//     } catch (\Exception $e) {
//         $outputText .= "❌ Failed to drop 'sessions' table. Error: " . $e->getMessage() . "\n";
//     }

//     // Now Fresh migrate
//     Artisan::call('migrate:fresh', ['--force' => true]);
//     $migrateOutput = Artisan::output();
//     $outputText .= "✅ migration complete.\n$migrateOutput\n";

//     // Seed database
//     Artisan::call('db:seed', ['--force' => true]);
//     $seedOutput = Artisan::output();
//     $outputText .= "✅ Database seeded successfully.\n$seedOutput\n";

//     // Final response
//     return nl2br($outputText);
// });


Route::get('/clear', function () {
    $outputText = "";

    Artisan::call('config:clear');
    $outputText .= "✅ Config cache cleared.\n";

    Artisan::call('route:clear');
    $outputText .= "✅ Route cache cleared.\n";

    Artisan::call('cache:clear');
    $outputText .= "✅ Application cache cleared.\n";

    try {
        Artisan::call('storage:link');
        $linkOutput = Artisan::output();
        $outputText .= "✅ Storage symlink created successfully.\n$linkOutput\n";
    } catch (\Exception $e) {
        $outputText .= "❌ Failed to create storage link. Error: " . $e->getMessage() . "\n";
    }

    // ✅ Safer migrate without fresh
    Artisan::call('migrate:fresh', ['--force' => true]);
    $migrateOutput = Artisan::output();
    $outputText .= "✅ Migrations complete.\n$migrateOutput\n";

    Artisan::call('db:seed', ['--force' => true]);
    $seedOutput = Artisan::output();
    $outputText .= "✅ Database seeded successfully.\n$seedOutput\n";

    return nl2br($outputText);
});
