import { Component, OnInit } from '@angular/core';
import { DocumentoCurricularListService } from '../../service/documento-curricular-list.service'; 
// importacion de pdf 
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { Doc, Student } from '../../interfaces/documento.interface';
/// componente para el modal


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
  
   const pdfDefinition: any = {
    header:[
      {
        
      }
    ],
    footer: ' pie de paginaa',
    content: [
      {
        style: 'tableExample',
        table:{
          //widths: ['auto', 'auto', 'auto'],
				  widths: [245, 245],
          body:[
            [{text: 'DOCUMENTO INDIVIDUAL DE ADAPTACIÓN CURRICULAR', style: 'tableHeader', colSpan: 2, alignment: 'center'}, {}],
            [{text: '1. DATOS DE IDENTIFICACIÓN DEL ESTUDIANTE', style: 'tableHeader', colSpan: 2}, {}],
            [{text: 'Padre / Tutor Legal: DAVID GARCÉS ', style: 'tableHeader',  colSpan: 2,}, {}],
            [{text: 'Nombres: MELANY MONSERRATE', style: 'tableHeader', colSpan: 1}, {text: 'Apellidos: GARCÉS JÁCOME',colSpan: 1}],
            [{text: 'Edad: 17 AÑOS 7 MESES ', style: 'tableHeader', colSpan: 1}, {text: 'Fecha y Lugar de Nacimiento: 11/11/03 MANTA',colSpan: 1}],
            [{text: 'Número de hermanos: 2', style: 'tableHeader', colSpan: 1}, {text: 'Lugar que ocupa: 2',colSpan: 1}],
            [{text: 'Nombre de la madre: PATRICIA JÁCOME', style: 'tableHeader', colSpan: 1}, {text: ' Nombre del padre: DAVID GARCES',colSpan: 1}],
            [{text: 'Domicilio:', style: 'tableHeader', colSpan: 1}, {text: 'CALLE 8 AVENIDA 14',colSpan: 1}],
            [{text: 'Ciudad: ', style: 'tableHeader', colSpan: 1}, {text: 'MANTA',colSpan: 1}],
            [{text: 'Provincia:', style: 'tableHeader', colSpan: 1}, {text: 'MANABÍ',colSpan: 1}],
            [{text: 'Código Postal:', style: 'tableHeader', colSpan: 1}, {text: '130802',colSpan: 1}],
            [{text: 'Teléfono:', style: 'tableHeader', colSpan: 1}, {text: '0989688108',colSpan: 1}],
            [{text: 'Grado o curso:  DÉCIMO              Paralelo: “A”', style: 'tableHeader', colSpan: 1}, {text: 'Año lectivo: 2021-2022',colSpan: 1}],
            
            [{text: '2. DATOS DE IDENTIFICACIÓN DE LA INSTITUCIÓN EDUCATIVA', style: 'tableHeader', colSpan: 2}, {}],
            [{text: 'Nombre: UE REPÚBLICA DEL ECUADOR', style: 'tableHeader', colSpan: 1}, {text: 'Distrito No.: 13D02',colSpan: 1}],
            [{text: 'Dirección:', style: 'tableHeader', colSpan: 1}, {text: 'CALLE 17 Y AVENIDA 35',colSpan: 1}],
            [{text: 'Localidad: MANTA', style: 'tableHeader', colSpan: 1}, {text: 'Código Postal: 130802',colSpan: 1}],
            [{text: 'Teléfono:', style: 'tableHeader', colSpan: 1}, {text: '',colSpan: 1}],
            [{text: 'Modalidad: MATUTINA', style: 'tableHeader', colSpan: 1}, {text: ' Tipo:       FISCAL',colSpan: 1}],
            
            [{text: '3. FECHA DE ELABORACIÓN Y DURACIÓN PREVISTA', style: 'tableHeader', colSpan: 2}, {}],
            [{text: 'Fecha de elaboración: ', style: 'tableHeader', colSpan: 2}, {}],
            [{text: 'Fecha de actualización: 21/07/2021', style: 'tableHeader', colSpan: 2}, {}],
            [{text: 'Duración prevista: Año lectivo 2021-2022', style: 'tableHeader', colSpan: 2}, {}],
            
            [{text: '4. ÁREAS / MATERIAS OBJETO DE ADAPTACIÓN CURRICULAR', style: 'tableHeader', colSpan: 2}, {}],
            [{text: 'Área / Materia', style: 'tableHeader', colSpan: 2}, {}],
            [{text: 'Lengua y Literatura',  colSpan: 2}, {}],
            [{text: 'Matemáticas',  colSpan: 2}, {}],
            [{text: 'Ciencias Naturales', colSpan: 2}, {}],
            [{text: 'Ciencias Sociales', colSpan: 2}, {}],
            [{text: 'Educación Física',  colSpan: 2}, {}],
            [{text: 'Inglés', colSpan: 2}, {}],
            [{text: 'Proyecto Educativo', colSpan: 2}, {}],
            
            [{text: '5. PROFESIONALES IMPLICADOS EN LA REALIZACIÓN DEL DOCUMENTO DE ADAPTACIÓN CURRICULAR', style: 'tableHeader', colSpan: 2}, {}],
            [{text: 'Nombre:', style: 'tableHeader', colSpan: 1}, {text: 'Función:', style: 'tableHeader',colSpan: 1}],
            [{text: 'Lic. Celia Williams Carranza', colSpan: 1}, {text: 'Docente de Lengua y Literatura',colSpan: 1}],
            [{text: 'Lic. Virginia Menéndez Rivadeneira', colSpan: 1}, {text: 'Docente de Inglés',colSpan: 1}],
            [{text: 'Lic. Karen Toro Mendoza', colSpan: 1}, {text: 'Docente de Ciencias Naturales',colSpan: 1}],
            [{text: 'Lic. Narcisa Bastidas Mora', colSpan: 1}, {text: 'Docente de Educación Física',colSpan: 1}],
            [{text: 'Lic. Cinthia Burau Carreño', colSpan: 1}, {text: 'Docente de Matemáticas y Proyecto Educativo',colSpan: 1}],
            [{text: 'Lic. Jairo Vélez Cedeño', colSpan: 1}, {text: 'Docente de Estudios Sociales',colSpan: 1}],
            
          ]

        }
      }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 200]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableExample: {
        margin: [0, 20, 0, 20]
      },
      tableHeader: {
        bold: true,
        fontSize: 11,
        color: 'black'
      }
    },
    
    images: {
     
    }
    
  }

     const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
 }



//  createPdf(){
//      const DATA = document.getElementById('myData');
//      const doc = new jsPDF('p', 'pt', 'a4');
//      const options = {
//        background: 'white',
//        scale: 3
//      };
//      html2canvas(DATA, options).then((canvas) => {

//        const img = canvas.toDataURL('image/PNG');

//       // Add image Canvas to PDF
//        const bufferX = 15;
//        const bufferY = 15;
//        const imgProps = (doc as any).getImageProperties(img);
//        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
//        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//        doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
//        return doc;
//     }).then((docResult) => {
//       docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
//     });
  
//   } 

}
