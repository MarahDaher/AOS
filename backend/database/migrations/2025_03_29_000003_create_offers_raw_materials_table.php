<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('offers_raw_materials', function (Blueprint $table) {
            $table->unsignedBigInteger('offer_id');
            $table->unsignedBigInteger('raw_material_id');
            $table->float('absolut_demand')->default(0);
            $table->float('share')->default(0); // calculated
            $table->string('supplier', 63)->nullable();
            $table->float('price')->nullable();
            $table->date('price_date')->nullable();

            $table->primary(['offer_id', 'raw_material_id']);
            $table->foreign('offer_id')->references('id')->on('offers')->restrictOnDelete()->restrictOnUpdate();
            $table->foreign('raw_material_id')->references('id')->on('raw_materials')->restrictOnDelete()->restrictOnUpdate();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('offers_raw_materials');
    }
};
