import { TestBed, async, inject } from '@angular/core/testing';

import { OwnArticleGuard } from './own-article.guard';

describe('OwnArticleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OwnArticleGuard]
    });
  });

  it('should ...', inject([OwnArticleGuard], (guard: OwnArticleGuard) => {
    expect(guard).toBeTruthy();
  }));
});
