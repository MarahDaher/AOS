<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('offer_drawings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('offer_id');
            $table->string('filename', 63);
            $table->dateTime('upload_date')->default(DB::raw('CURRENT_TIMESTAMP'));

            // Index
            $table->foreign('offer_id')->references('id')->on('offers');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('offer_drawings');
    }
};
