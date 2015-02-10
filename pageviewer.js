'use strict';

if (!PDFJS.PDFViewer || !PDFJS.getDocument) {
  alert('Please build the library and components using\n' +
        '  `node make generic components`');
}

// In cases when the pdf.worker.js is located at the different folder than the
// pdf.js's one, or the pdf.js is executed via eval(), the workerSrc property
// shall be specified.
//
// PDFJS.workerSrc = '../../build/pdf.worker.js';

// Some PDFs need external cmaps.
//
// PDFJS.cMapUrl = '../../external/bcmaps/';
// PDFJS.cMapPacked = true;

var DEFAULT_URL = 'compressed.tracemonkey-pldi-09.pdf';
var PAGE_TO_VIEW = 1;
var SCALE = 1.0;
var pdfDoc = null;
var container = document.getElementById('pageContainer');
var pageNum = document.getElementById('page_num');
var pageCount = document.getElementById('page_count');


function onPrevPage()
{
    if (PAGE_TO_VIEW <= 1)
    {
        return;
    }
    PAGE_TO_VIEW--;
    renderPage(PAGE_TO_VIEW);
}
document.getElementById('prev').addEventListener('click', onPrevPage);

    /**
     * Displays next page.
     */
function onNextPage()
{
    //if (PAGE_TO_VIEW >= document.getElementById('page_count').textContent)
    //{
    //	return;
    //}
    PAGE_TO_VIEW++;
    renderPage(PAGE_TO_VIEW);
}

function onPageNumChange(e)
{
	if (e.keyCode == 13) {
		PAGE_TO_VIEW = parseInt(e.target.value);
		renderPage(PAGE_TO_VIEW);
	}
	return false;
}
document.getElementById('next').addEventListener('click', onNextPage);
document.getElementById('page_num').addEventListener('keypress', onPageNumChange);



function renderPage(num)
{
    container.textContent = "";
    var tempDoc = pdfDoc.getPage(num).then(function (pdfPage)
    {
        // Creating the page view with default parameters.
        var pdfPageView = new PDFJS.PDFPageView({
            container: container,
            id: num,
            scale: SCALE,
            defaultViewport: pdfPage.getViewport(SCALE),
            // We can enable text/annotations layers, if needed
            textLayerFactory: new PDFJS.DefaultTextLayerFactory(),
            annotationsLayerFactory: new PDFJS.DefaultAnnotationsLayerFactory()
        });
        // Associates the actual page with the view, and drawing it
        pdfPageView.setPdfPage(pdfPage);
        return pdfPageView.draw();
    });
    pageNum.value = PAGE_TO_VIEW;
    pageCount.textContent = pdfDoc.numPages;
    return tempDoc;
}

    // Loading document.
PDFJS.getDocument(DEFAULT_URL).then(function (pdfDocument)
{
    // Document loaded, retrieving the page.
    pdfDoc = pdfDocument;
    return renderPage(PAGE_TO_VIEW);
});



