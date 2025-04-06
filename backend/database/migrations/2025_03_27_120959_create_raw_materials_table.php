<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('raw_materials', function (Blueprint $table) {
            $table->id();
            $table->string('name', 127)->nullable();
            $table->string('type', 63)->nullable();
            $table->float('density')->default(0);
            $table->float('price')->nullable();
            $table->date('price_date')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('raw_materials');
    }
};
