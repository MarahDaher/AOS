<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up()
    {
        Schema::create('additives_offers_raw_materials', function (Blueprint $table) {
            $table->unsignedBigInteger('offer_id');
            $table->unsignedBigInteger('raw_material_id');
            $table->unsignedBigInteger('additives_id');
            $table->float('share')->default(0);

            // Composite Primary Key
            $table->primary(['offer_id', 'raw_material_id', 'additives_id']);

            // Foreign Keys
            $table->foreign('offer_id')
                ->references('id')
                ->on('offers')
                ->restrictOnDelete()
                ->restrictOnUpdate();

            $table->foreign('raw_material_id')
                ->references('id')
                ->on('raw_materials')
                ->restrictOnDelete()
                ->restrictOnUpdate();

            $table->foreign('additives_id')
                ->references('id')
                ->on('additives')
                ->restrictOnDelete()
                ->restrictOnUpdate();

            $table->engine = 'InnoDB';
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_0900_ai_ci';
        });
    }

    public function down()
    {
        Schema::dropIfExists('additives_offers_raw_materials');
    }
};
