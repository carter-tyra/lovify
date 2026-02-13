import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ValentineComponent } from './valentine.component';
import { LoveLetterComponent } from './love-letter/love-letter.component';
import { PhotoMemoriesComponent } from './photo-memories/photo-memories.component';
import { ProposalComponent } from './proposal/proposal.component';
import { ValentineWizardComponent } from './valentine-wizard/valentine-wizard.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ValentineComponent
      }
    ])
  ],
  declarations: [
    ValentineComponent,
    LoveLetterComponent,
    PhotoMemoriesComponent,
    ProposalComponent,
    ValentineWizardComponent
  ]
})
export class ValentineModule {}
