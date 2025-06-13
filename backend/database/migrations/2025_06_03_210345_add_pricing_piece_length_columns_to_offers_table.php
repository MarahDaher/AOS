<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('offers', function (Blueprint $table) {
            $table->integer('pricing_piece_length_prices_length1')->nullable();
            $table->integer('pricing_piece_length_prices_length2')->nullable();
            $table->integer('pricing_piece_length_prices_length3')->nullable();
            $table->integer('pricing_piece_length_prices_length4')->nullable();
            $table->integer('pricing_piece_length_prices_length5')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('offers', function (Blueprint $table) {
            $table->dropColumn([
                'pricing_piece_length_prices_length1',
                'pricing_piece_length_prices_length2',
                'pricing_piece_length_prices_length3',
                'pricing_piece_length_prices_length4',
                'pricing_piece_length_prices_length5',
            ]);
        });
    }
};
