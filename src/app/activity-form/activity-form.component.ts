import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.css'],
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatNativeDateModule,  MatDatepickerModule, MatInputModule, MatButtonModule, ReactiveFormsModule]
})
export class ActivityFormComponent {
  activityForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.activityForm = this.fb.group({
      name: ['', Validators.required],
      registration: ['', Validators.required],
      date: ['', Validators.required],
      weeks: this.fb.array([this.createWeek()])
    });
  }

  get weeks(): FormArray {
    return this.activityForm.get('weeks') as FormArray;
  }

  createWeek(): FormGroup {
    return this.fb.group({
      completedActivities: ['', Validators.required],
      estimatedDuration: ['', Validators.required],
      natureOfActivities: ['', Validators.required]
    });
  }

  addWeek() {
    this.weeks.push(this.createWeek());
  }

  submit() {
    if (this.activityForm.valid) {
      const formValue = this.activityForm.value;
      const doc = new jsPDF();

      
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('Relatório de Atividades', 10, 10);

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Nome: ${formValue.name}`, 10, 20);
      doc.text(`Matrícula: ${formValue.registration}`, 10, 30);
      doc.text(`Data: ${new Date(formValue.date).toLocaleDateString('pt-BR')}`, 10, 40);

      
      let yOffset = 50;
      formValue.weeks.forEach((week: { completedActivities: string; estimatedDuration: string; natureOfActivities: string }, index: number) => {
        doc.setFont('helvetica', 'bold');
        doc.text(`Semana ${index + 1}`, 10, yOffset);

        doc.setFont('helvetica', 'normal');
        const activities = week.completedActivities.split('\n');
        activities.forEach((activity, i) => {
          doc.text(`• ${activity}`, 10, yOffset + 10 + (i * 10));
        });
        doc.text(`Duração Estimada: ${week.estimatedDuration}`, 10, yOffset + 20 + (activities.length * 10));
        doc.text(`Natureza das Atividades: ${week.natureOfActivities}`, 10, yOffset + 30 + (activities.length * 10));

        
        doc.setLineWidth(0.5);
        doc.line(10, yOffset + 35 + (activities.length * 10), 200, yOffset + 35 + (activities.length * 10));
        
        yOffset += 50 + (activities.length * 10);
      });

      const pdfData = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfData);
      window.open(pdfUrl);
    }

  }

  download(){
    if (this.activityForm.valid) {
      const formValue = this.activityForm.value;
      const doc = new jsPDF();

      
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('Relatório de Atividades', 10, 10);

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Nome: ${formValue.name}`, 10, 20);
      doc.text(`Matrícula: ${formValue.registration}`, 10, 30);
      doc.text(`Data: ${new Date(formValue.date).toLocaleDateString('pt-BR')}`, 10, 40);
      
      
      let yOffset = 50;
      formValue.weeks.forEach((week: { completedActivities: string; estimatedDuration: string; natureOfActivities: string }, index: number) => {
        doc.setFont('helvetica', 'bold');
        doc.text(`Semana ${index + 1}`, 10, yOffset);

        doc.setFont('helvetica', 'normal');
        const activities = week.completedActivities.split('\n');
        activities.forEach((activity, i) => {
          doc.text(`• ${activity}`, 10, yOffset + 10 + (i * 10));
        });
        doc.text(`Duração Estimada: ${week.estimatedDuration}`, 10, yOffset + 20 + (activities.length * 10));
        doc.text(`Natureza das Atividades: ${week.natureOfActivities}`, 10, yOffset + 30 + (activities.length * 10));

        
        doc.setLineWidth(0.5);
        doc.line(10, yOffset + 35 + (activities.length * 10), 200, yOffset + 35 + (activities.length * 10));
        
        yOffset += 50 + (activities.length * 10);
      });

      const pdfData = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfData);
      doc.save(`relatorio-${this.activityForm.value.name}.pdf`);
    }
  }
}