<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('offers_raw_materials', function (Blueprint $table) {
            $table->foreignId('offer_id')->constrained('offers')->restrictOnDelete()->restrictOnUpdate();
            $table->foreignId('raw_material_id')->constrained('raw_materials')->restrictOnDelete()->restrictOnUpdate();
            $table->float('absolut_demand')->default(0);
            $table->float('share')->default(0);
            $table->string('supplier', 63)->nullable();

            $table->primary(['offer_id', 'raw_material_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('offers_raw_materials');
    }
};
