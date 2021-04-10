import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, ViewChild } from '@angular/core';
import { SearchData, SearchResult } from 'ngx-mat-searchbox';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { data, DataRecord } from './app.data';

/**
 * Displays a list of users, with a searchbox connected to the list
 */

type ListRecord = Omit<DataRecord, 'last_name' | 'first_name'> & { name: string };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'SearchboxDemo';

  /** Reference to scrolling viewport for users list */
  @ViewChild('usersviewport')
  private usersViewport: CdkVirtualScrollViewport | undefined;

  /** Data to be displayed in list */
  public usersData: ListRecord[] =
    data.map(record => ({ id: record.id, name: `${record.last_name}, ${record.first_name}`, email: record.email }));

  /** Data to be delivered to the search box */
  public searchData: SearchData = data.map(record => [record.id, record.last_name, record.first_name, record.email]);

  /**
   * Rows found on user search
   */
  private usersRowsFound: BehaviorSubject<number[]> = new BehaviorSubject(new Array<number>());

  constructor() { }

  /**
   * Respond to users Search field result emission
   */
   public usersSearched(searchResults: SearchResult[]): void {
    this.usersRowsFound.next(Array.from(new Set(searchResults.map(searchResult => searchResult.rowIndex))));

    // scroll to the first found item to ensure it is visible
    if (searchResults.length > 0) {
      this.usersViewport?.scrollToIndex(searchResults[0].rowIndex);
    }
  }

  /**
   * Used for each option in users list, to query as to whether it is in current search found set
   */
  public usersRowFound(row: number): Observable<boolean> {
    return this.usersRowsFound.pipe(filter(rows => rows.includes(row)), map(rows => rows.length > 0));
  }
}
