import mongoose from "mongoose";
class globalVariable {
    // Define the global object type as a Record<string, any>
    global: Record<string, any>;
  
    constructor(global: Record<string, any> = {}) {
      this.global = global;
    }
  
    // Optionally, you can define methods to manipulate the global object if needed
    set(key: string, value: any) {
      this.global[key] = value;
    }
  
    get(key: string) {
      return this.global[key];
    }
  
    // To retrieve the entire global object
    getGlobal() {
      return this.global;
    }
}

let globalVariableCls = new globalVariable({"mongoose":false})
export default globalVariableCls
