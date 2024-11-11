import { IMessage } from "./context";

class Queue {
    #items: IMessage[];

    static #instance: Queue;

    private constructor() {
        this.#items = [];
    }

    public static get instance(): Queue {
        if (!Queue.#instance) {
            Queue.#instance = new Queue();
        }

        return Queue.#instance;
    }

    public enqueue(item: IMessage) {
        console.log('enqueue', item)
        this.#items.push(item);
        console.log(this.#items)
    }

    public dequeue() : string | IMessage {
        if (this.isEmpty()) {
            return "Empty";
        }
        return this.#items.shift() ?? "Empty";
    }

    public peek() : string | IMessage {
        if (this.isEmpty()) {
            return "Empty";
        }
        return this.#items[0];
    }

    public size() {
        console.log('size', this.#items)
        return this.#items.length;
    }

    public isEmpty() {
        return this.#items.length === 0;
    }
}

export default Queue;