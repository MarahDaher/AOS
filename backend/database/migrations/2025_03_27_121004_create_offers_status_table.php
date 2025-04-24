<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('offer_status', function (Blueprint $table) {
            $table->id();
            $table->string('name', 127)->nullable();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('offer_status');
    }
};
