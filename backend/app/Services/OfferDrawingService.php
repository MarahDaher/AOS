<?php


namespace App\Services;

use App\Models\Offer;
use App\Models\OfferDrawing;
use App\Repositories\OfferDrawingRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class OfferDrawingService
{
    public function __construct(private OfferDrawingRepository $repository) {}


    public function storeDrawing(Offer $offer, UploadedFile $file): OfferDrawing
    {
        $year = now()->year;
        $basePath = config('offer_drawings.base_path');
        $filename = $file->getClientOriginalName();

        // Full path to external /storage folder (not inside Laravel)
        $destinationPath = base_path("../storage/{$basePath}/{$year}");

        // Create folder if not exists
        if (!file_exists($destinationPath)) {
            mkdir($destinationPath, 0755, true);
        }

        // Move the uploaded file to external storage
        $file->move($destinationPath, $filename);

        return $this->repository->create([
            'offer_id' => $offer->id,
            'filename' => $filename,
            'upload_date' => now(),
        ]);
    }




    public function getLatestDrawing(Offer $offer): ?OfferDrawing
    {
        return $this->repository->getLatestByOffer($offer->id);
    }
}
