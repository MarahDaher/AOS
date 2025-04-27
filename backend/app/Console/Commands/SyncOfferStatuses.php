<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class SyncOfferStatuses extends Command
{
    protected $signature = 'sync:offer-statuses';
    protected $description = 'Sync offer statuses from config to database';

    public function handle()
    {
        $statuses = config('offer_statuses.statuses');

        foreach ($statuses as $key => $name) {
            DB::table('offer_status')->updateOrInsert(
                ['name' => $name],
                ['name' => $name]
            );
        }

        $this->info('Offer statuses synced successfully!');
    }
}
