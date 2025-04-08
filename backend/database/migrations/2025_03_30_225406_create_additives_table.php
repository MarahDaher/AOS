<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up()
    {
        Schema::create('additives', function (Blueprint $table) {
            $table->id();
            $table->string('name', 31);
            $table->string('category', 31)->nullable();
            $table->float('price')->nullable();
            $table->date('price_date')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('additives');
    }
};
