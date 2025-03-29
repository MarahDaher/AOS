<?php

namespace Database\Factories;

use App\Models\Offer;
use Illuminate\Database\Eloquent\Factories\Factory;

class OfferFactory extends Factory
{
    protected $model = Offer::class;

    public function definition(): array
    {
        return [
            'general_status' => $this->faker->randomElement(['Vorkalkulation', 'Angebot', 'Auftrag', 'Produziert', 'Versandt']),
            'general_offer_number' => $this->faker->unique()->bothify('O-#####'),
            'general_material' => $this->faker->word,
            'general_profile_description' => $this->faker->randomNumber(),
            'general_created_by_user_id' => 1, // adjust as needed
            'general_color' => $this->faker->safeColorName(),
            'general_packaging' => $this->faker->randomDigitNotZero(),
            'general_tool_number' => $this->faker->bothify('T-####'),
            'general_order_number' => $this->faker->bothify('OR-####'),
            'general_delivery_type' => $this->faker->randomElement(['frei', 'unfrei']),
            'general_article_number' => $this->faker->bothify('A-####'),
            'general_customer' => $this->faker->company,
            'general_customer_contact_person' => $this->faker->name,
            'general_customer_article_number' => $this->faker->bothify('CA-####'),
            'general_request_date' => $this->faker->date(),
            'general_request_number' => $this->faker->randomNumber(),
        ];
    }
}
