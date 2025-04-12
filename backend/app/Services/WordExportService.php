<?php

namespace App\Services;

use PhpOffice\PhpWord\PhpWord;
use PhpOffice\PhpWord\IOFactory;
use PhpOffice\PhpWord\Shared\Html;
use PhpOffice\PhpWord\SimpleType\TblWidth;
use PhpOffice\PhpWord\SimpleType\Jc;
use Illuminate\Support\Facades\Response;

class WordExportService
{
    public function exportHtmlToWord(string $htmlContent, string $filename)
    {
        $cleanHtml = $this->wrapHtml($htmlContent);

        $phpWord = new PhpWord();
        $section = $phpWord->addSection();

        // 👉 Add Header
        $this->addHeader($section);

        // 👉 Add Footer
        $this->addFooter($section);

        // 👉 Add body content
        Html::addHtml($section, $cleanHtml, false, false);

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

    private function addFooter($section)
    {
        $footer = $section->addFooter();

        $table = $footer->addTable([
            'borderSize' => 0,
            'cellMargin' => 80,
            'width' => 100 * 50,
            'unit' => \PhpOffice\PhpWord\SimpleType\TblWidth::PERCENT,

            // ❗ Explicitly disable table borders
            'tableBorderTopSize' => 0,
            'tableBorderBottomSize' => 0,
            'tableBorderLeftSize' => 0,
            'tableBorderRightSize' => 0,
        ]);

        $table->addRow();

        $firstCellBorderStyle = [
            'borderLeftColor' => '0070C0',
            'borderLeftSize' => 12,
            'borderRightColor' => '0070C0',
            'borderRightSize' => 12,
            'borderTopSize' => 0,
            'borderBottomSize' => 0,
            'valign' => 'top',
        ];

        $otherCellsBorderStyle = [
            'borderRightColor' => '0070C0',
            'borderRightSize' => 12,
            'borderTopSize' => 0,
            'borderBottomSize' => 0,
            'valign' => 'top',
        ];

        // 📋 First column - Company info
        $cell1 = $table->addCell(3333, $firstCellBorderStyle);
        $cell1->addText('AOS Kunststofftechnik GmbH', ['size' => 8], ['spaceAfter' => 50]);
        $cell1->addText('Josef-Ost-Straße 11', ['size' => 8], ['spaceAfter' => 50]);
        $cell1->addText('89257 Illertissen', ['size' => 8], ['spaceAfter' => 50]);
        $cell1->addText('info@aos-kunststofftechnik.de', ['size' => 8], ['spaceAfter' => 50]);
        $cell1->addText('www.aos-kunststofftechnik.de', ['size' => 8], ['spaceAfter' => 50]);
        $cell1->addText('Tel: +49 7303 / 9602-0', ['size' => 8], ['spaceAfter' => 50]);

        // 📋 Second column - Bank info
        $cell2 = $table->addCell(3333, $otherCellsBorderStyle);
        $cell2->addText('Bankverbindung:', ['size' => 8], ['spaceAfter' => 50]);
        $cell2->addText('Sparkasse Neu-Ulm – Illertissen', ['size' => 8], ['spaceAfter' => 50]);
        $cell2->addText('IBAN: DE44 7305 0000 0441 7647 84', ['size' => 8], ['spaceAfter' => 50]);
        $cell2->addText('BIC: BYLADEM1NUL', ['size' => 8], ['spaceAfter' => 50]);

        // 📋 Third column - Legal info
        $cell3 = $table->addCell(3333, $otherCellsBorderStyle);
        $cell3->addText('Sitz: Illertissen', ['size' => 8], ['spaceAfter' => 50]);
        $cell3->addText('Registergericht: Memmingen HRB 18724', ['size' => 8], ['spaceAfter' => 50]);
        $cell3->addText('Geschäftsführer: Armin Oßwald', ['size' => 8], ['spaceAfter' => 50]);
        $cell3->addText('Ust.ID-Nr.: DE 330922308', ['size' => 8], ['spaceAfter' => 50]);
        $cell3->addText('Steuernummer: 151/116/10409', ['size' => 8], ['spaceAfter' => 50]);
    }

    private function wrapHtml(string $html): string
    {
        if (!str_contains($html, '<html')) {
            return '<html><body>' . $html . '</body></html>';
        }
        return $html;
    }

    private function sanitizeFilename(string $filename): string
    {
        return preg_replace('/[^A-Za-z0-9_\-]/', '_', $filename);
    }
}
