import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCompoent } from './sidebar.compoent';

describe('SidebarCompoent', () => {
  let component: SidebarCompoent;
  let fixture: ComponentFixture<SidebarCompoent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarCompoent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarCompoent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
