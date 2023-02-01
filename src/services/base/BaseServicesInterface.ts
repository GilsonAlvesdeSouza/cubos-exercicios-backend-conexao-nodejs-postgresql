export default interface BaseServicesInterface<T> {
	all(): Promise<Array<T>>;
	create(data: T): Promise<Partial<T>>;
	find(id: number): Promise<T | undefined>;
	update(data: T): Promise<T>;
	delete(id: number): Promise<T>;
}
