import { Component, OnInit } from '@angular/core';
import { DocumentoCurricularListService } from '../../service/documento-curricular-list.service'; 
// importacion de pdf 
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Doc, Student } from '../../interfaces/documento.interface';

@Component({
  selector: 'app-estudiante-list',
  templateUrl: './documento-curricular-list.component.html',
  styleUrls: ['./documento-curricular-list.component.css']
})
export class DocumentoCurricularListComponent implements OnInit {
  
  documentoList: Doc[] = [];
  estudianteList: Student[] = [];
//------paginacion----
pageActual: number = 1;

  // -------filtro de pipe
  filterItems = '';


  constructor(private documentoCurricularListService:DocumentoCurricularListService) { }

  ngOnInit(): void {
    this.documentoCurricularListService.getDocumento()
      .subscribe(documentos => this.documentoList= documentos.docs)
  }

  ///cracion del pdf-------------- 
  createPdf(){
    const DATA = document.getElementById('myData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  
  } 

}
