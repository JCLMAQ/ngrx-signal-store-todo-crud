import { TestBed, waitForAsync } from '@angular/core/testing';
import { signalStore, withState } from '@ngrx/signals';
import { of } from 'rxjs';
import { provideMock } from '../../../testing/auto-mock';
import { withCrudOperations } from './crud.feature';
import { Todo } from './todo';
import { TodoService } from './todo.service';

describe('CrudState', () => {
  const initialState = { items: [], loading: false };

  let service: TodoService;
  const testStore = signalStore(
    withState(initialState),
    withCrudOperations<Todo>(TodoService)
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [testStore, provideMock(TodoService)],
    });

    service = TestBed.inject(TodoService);
  });

  it('should add an item to the store', waitForAsync(() => {
    // arrange
    const store = TestBed.inject(testStore);
    const item = { id: '1', value: 'test' } as Todo;
    const spy = jest.spyOn(service, 'addItem').mockReturnValue(of(item));

    // act
    store.addItem('test');

    // assert
    expect(spy).toHaveBeenCalled();
    expect(store.items()).toEqual([item]);
    expect(store.loading()).toEqual(false);
  }));

  it('should load all items into the store', waitForAsync(() => {
    // arrange
    const store = TestBed.inject(testStore);
    const items = [{ id: '1', value: 'test' } as Todo];
    const spy = jest
      .spyOn(service, 'getItemsAsPromise')
      .mockReturnValue(Promise.resolve(items));

    // act
    store.loadAllItemsByPromise().then(() => {
      // assert
      expect(spy).toHaveBeenCalled();
      expect(store.items()).toEqual(items);
      expect(store.loading()).toEqual(false);
    });
  }));

  it('should load all items into the store', waitForAsync(() => {
    // arrange
    const store = TestBed.inject(testStore);
    const items = [{ id: '1', value: 'test' } as Todo];
    const spy = jest
      .spyOn(service, 'getItemsAsPromise')
      .mockReturnValue(Promise.resolve(items));

    // act
    store.loadAllItemsByPromise().then(() => {
      // assert
      expect(spy).toHaveBeenCalled();
      expect(store.items()).toEqual(items);
      expect(store.loading()).toEqual(false);
    });
  }));

  it('should delete an item from the store', waitForAsync(() => {
    // arrange
    const store = TestBed.inject(testStore);
    const item = { id: '1', value: 'test' } as Todo;
    jest.spyOn(service, 'addItem').mockReturnValue(of(item));
    store.addItem('test');

    expect(store.items()).toEqual([item]);

    const spy = jest.spyOn(service, 'deleteItem').mockReturnValue(of(null));

    // act
    store.deleteItem(item);

    // assert
    expect(spy).toHaveBeenCalled();
    expect(store.items()).toEqual([]);
    expect(store.loading()).toEqual(false);
  }));

  it('should update an item in the store', waitForAsync(() => {
    // arrange
    const store = TestBed.inject(testStore);
    const item = { id: '1', value: 'test' } as Todo;
    jest.spyOn(service, 'addItem').mockReturnValue(of(item));
    store.addItem('test');

    expect(store.items()).toEqual([item]);

    const updatedItem = { id: '1', value: 'updated' } as Todo;
    const spy = jest
      .spyOn(service, 'updateItem')
      .mockReturnValue(of(updatedItem));

    // act
    store.update(updatedItem);

    // assert
    expect(spy).toHaveBeenCalled();
    expect(store.items()).toEqual([updatedItem]);
    expect(store.loading()).toEqual(false);
  }));
});
