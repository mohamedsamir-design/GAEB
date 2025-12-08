import { CommonModule } from '@angular/common';
import { Component, signal, inject } from '@angular/core';
import { FormArray, FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from '../../shared/header/header';
import { Router } from '@angular/router';
import { LandApiService } from '../../../services/land-api.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'documentsData',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormsModule, HeaderComponent],
  templateUrl: './documentsData.html',
  styleUrl: './documentsData.css'
})
export class DocumentsData {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private landApiService = inject(LandApiService);
  private errorHandler = inject(ErrorHandlerService);

  form: FormGroup = this.fb.group({
    landCode: ['', Validators.required],
    availableDocuments: this.fb.array([])
  });

  availableDocuments: any[] = [
    { id: '1', name: 'موافقه وزارة الزراعة', exist: false, doesNotExist: false, notRequired: false },
    { id: '2', name: 'موافقه الدفاع المدني على عرض الشوارع', exist: false, doesNotExist: false, notRequired: false },
    { id: '3', name: 'قرار التخصيص', exist: false, doesNotExist: false, notRequired: false },
    { id: '4', name: 'موافقة الوحدات المحلية على الحفر', exist: false, doesNotExist: false, notRequired: false },
    { id: '5', name: 'موافقة هيئة الاثار', exist: false, doesNotExist: false, notRequired: false },
    { id: '6', name: 'موافقة اللجنة الثلاثية على المواقع غير', exist: false, doesNotExist: false, notRequired: false },
    { id: '7', name: 'مستندات الملكية', exist: false, doesNotExist: false, notRequired: false },
    { id: '8', name: 'تراخيص البناء', exist: false, doesNotExist: false, notRequired: false },
    { id: '9', name: 'مطلوب نقل ملكيتها', exist: false, doesNotExist: false, notRequired: false },
    { id: '10', name: 'عقد تبرع (عقد الهبة)', exist: false, doesNotExist: false, notRequired: false },
    { id: '11', name: 'مستند يفيد بخلو التبرع من شرط المرحلة', exist: false, doesNotExist: false, notRequired: false },
    { id: '12', name: 'موافقة السكه الحديد', exist: false, doesNotExist: false, notRequired: false },
    { id: '13', name: 'موافقة الموارد المائية', exist: false, doesNotExist: false, notRequired: false },
    { id: '14', name: 'موافقة الطرق', exist: false, doesNotExist: false, notRequired: false },
    { id: '15', name: 'موافقة الكهرباء', exist: false, doesNotExist: false, notRequired: false },
    { id: '16', name: 'موافقة الطيران المدني', exist: false, doesNotExist: false, notRequired: false },
    { id: '17', name: 'موافقة الصحة', exist: false, doesNotExist: false, notRequired: false },
    { id: '18', name: 'موافقة القوات المسلحة', exist: false, doesNotExist: false, notRequired: false },
    { id: '19', name: 'موافقة التيلفونات', exist: false, doesNotExist: false, notRequired: false },
    { id: '20', name: 'موافقة مياه الشرب والصرف الصحي', exist: false, doesNotExist: false, notRequired: false },
    { id: '21', name: 'موافقة البترول', exist: false, doesNotExist: false, notRequired: false },
    { id: '22', name: 'طلب الشراء', exist: false, doesNotExist: false, notRequired: false },
    { id: '23', name: 'الخريطة المساحية', exist: false, doesNotExist: false, notRequired: false },
    { id: '24', name: 'موافقة البيئة', exist: false, doesNotExist: false, notRequired: false },];

  // per-row selection validation flags
  selectionErrors: boolean[] = [];

  protected goBack(): void {
    this.router.navigate(['/map-integration-with-land-system']);
  }

  protected goHome(): void {
    this.router.navigate(['/dashboard']);
  }

  protected logout(): void {
    this.router.navigate(['/login']);
  }

  submit(): void {
    // validate that each document row has one selection
    if (!this.validateDocumentSelections()) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // build payload: landCode + documents with selection value
    const landCode = this.form.get('landCode')?.value;
    const documentsPayload = this.availableDocuments.map(doc => ({
      id: doc.id,
      name: doc.name,
      selection: doc.exist ? 'Exist' : doc.doesNotExist ? 'DoesNotExist' : doc.notRequired ? 'NotRequired' : null
    }));

    const payload = {
      landCode,
      documents: documentsPayload
    };

//    this.landApiService.ConnectLandAndLegal(payload).subscribe({
  //    next: () => {
        console.log('Documents linked to land', payload);
        alert('✅ تم حفظ بيانات المستندات وربطها بالأرض بنجاح!');
        this.form.reset();
        // reset model selections
        this.availableDocuments.forEach(d => { d.exist = d.doesNotExist = d.notRequired = false; });
        this.selectionErrors = [];
    //   },
    //   error: (error) => {
    //     console.error('Error saving documents for land', error, payload);
    //     alert('حدث خطأ أثناء حفظ بيانات المستندات. حاول مرة أخرى.');
    //   }
    // });

    // For now, just log the values. Integrate with API as needed.
    this.form.setControl('schoolIds', this.fb.array([this.fb.control('', Validators.required)]));
  }

  validateDocumentSelections(): boolean {
    this.selectionErrors = [];
    let allOk = true;
    this.availableDocuments.forEach((doc, idx) => {
      const hasSelection = !!(doc.exist || doc.doesNotExist || doc.notRequired);
      this.selectionErrors[idx] = !hasSelection;
      if (!hasSelection) { allOk = false; }
    });
    return allOk;
  }

  onDocSelection(index: number): void {
    this.selectionErrors[index] = false;
  }
}
