<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('raw_material', function (Blueprint $table) {
            $table->id();
            $table->string('name', 127)->nullable();
            $table->string('type', 63)->nullable();
            $table->float('price_per_kg')->nullable();
            $table->float('price_per_piece')->nullable();
            $table->date('price_date')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('raw_material');
    }
};
