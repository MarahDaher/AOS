<?php

namespace App\Services;

use PhpOffice\PhpWord\PhpWord;
use PhpOffice\PhpWord\IOFactory;
use PhpOffice\PhpWord\Shared\Html;
use PhpOffice\PhpWord\SimpleType\TblWidth;
use PhpOffice\PhpWord\SimpleType\Jc;
use Illuminate\Support\Facades\Response;
use PhpOffice\PhpWord\TemplateProcessor;

class WordExportService
{

    public function exportOfferWithTemplate(array $data, string $outputFilename)
    {
        $templatePath = storage_path('app/templates/Angebot Vorlage AOS.docx');

        $template = new TemplateProcessor($templatePath);

        // 🔄 Replace placeholders in the DOCX with dynamic data
        $template->setValue('company_name', $data['company_name'] ?? 'Marah');
        $template->setValue('color', $data['color'] ?? 'blue');
        $template->setValue('profile_name', $data['profile_name'] ?? 'Daher');
        // $template->setValue('price_per_meter', $data['price_per_meter'] ?? '1,47');
        // $template->setValue('delivery_time', $data['delivery_time'] ?? 'ca. 15 AT');
        // $template->setValue('manager_name', $data['manager_name'] ?? 'Michael Diebner');
        // 🔁 Add as many placeholders as you defined in the Word file like ${...}

        $outputPath = storage_path("app/public/{$outputFilename}.docx");
        $template->saveAs($outputPath);

        return response()->download($outputPath)->deleteFileAfterSend();
    }

    public function exportHtmlToWord(string $htmlContent, string $filename)
    {
        $htmlContent = $this->extractBodyContent($htmlContent);

        $phpWord = new PhpWord();
        $section = $phpWord->addSection();

        $this->addHeader($section);
        $htmlFooter = view('exports.footer')->render();
        $footer = $section->addFooter();
        Html::addHtml($footer, $htmlFooter, false, false);

        Html::addHtml($section, $htmlContent, false, false);

        $filename = $this->sanitizeFilename($filename) . '.docx';

        return Response::streamDownload(function () use ($phpWord) {
            $objWriter = IOFactory::createWriter($phpWord, 'Word2007');
            $objWriter->save('php://output');
        }, $filename, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ]);
    }

    private function addHeader($section)
    {
        $header = $section->addHeader();

        // Logo aligned right
        $header->addImage(public_path('images/aos_logo.png'), [
            'width' => 190,
            'height' => 100,
            'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::RIGHT,
        ]);

        // Line break
        $header->addTextBreak(2);

        // Company name aligned left
        $header->addText(
            'AOS Kunststofftechnik GmbH, 89257 Illertissen-Au',
            [
                'bold' => true,
                'size' => 10,
                'underline' => 'single',
                'spacing' => 8,
            ],
            ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::LEFT]
        );
        $header->addTextBreak(2);
    }


    private function extractBodyContent(string $html): string
    {
        $bodyStart = strpos($html, '<body>');
        $bodyEnd = strpos($html, '</body>');

        if ($bodyStart !== false && $bodyEnd !== false) {
            return substr($html, $bodyStart + 6, $bodyEnd - $bodyStart - 6);
        }

        return $html; // fallback if no body found
    }


    private function sanitizeFilename(string $filename): string
    {
        return preg_replace('/[^A-Za-z0-9_\-]/', '_', $filename);
    }
}
