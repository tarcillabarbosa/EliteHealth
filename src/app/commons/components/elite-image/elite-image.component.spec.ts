import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliteImageComponent } from './elite-image.component';

describe('EliteImageComponent', () => {
  let component: EliteImageComponent;
  let fixture: ComponentFixture<EliteImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliteImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliteImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
