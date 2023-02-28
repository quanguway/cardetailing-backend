import arrayToTree from 'array-to-tree'
import TreeModel from 'tree-model';
import treeToList from 'tree-to-list';

export interface NodeModel {
    id?: string; 
    title?: string;
    children?: NodeModel[];
    level?: number;
}

export class Tree {
    private treeData: NodeModel[];
    private treeModel;
    constructor(private data: any) {
        this.treeData = arrayToTree(data,  {
            parentProperty: 'parent_id',
            customID: 'id'
          }) as NodeModel[];
         this.treeModel = new TreeModel().parse(this.treeData);
    }

    getJson() {
        return this.treeModel.all(function (node) {
            return true;
        })[0].model;
    }

    getChildren(model: NodeModel) {
        return model.children
    }

    isExist(id: string) {
        const response = this.getArrayJson().filter((node: any) => node.id == id)
        
        return response.length !== 0 ? true : false;
    }

    // function search (tree, value, key = 'id', reverse = false) {
    //     const stack = [ tree[0] ]
    //     while (stack.length) {
    //       const node = stack[reverse ? 'pop' : 'shift']()
    //       if (node[key] === value) return node
    //       node.children && stack.push(...node.children)
    //     }
    //     return null
    //   }

    getNodeById(id: string, reverse = false) {
        const stack = [ this.treeData[0] ]
        while (stack.length) {
            const node = stack[reverse ? 'pop' : 'shift']()
          
            if (node?.id === id) return node
            node?.children && stack.push(...node.children)
        }
        return null
    } 

    getPathByTitle(target: string, array:any) {    
        var result;
        array?.map((node: any) =>{                                                 
            if (node.title === target) return result = node.title;
            var temp = this.getPathByTitle(target, node.children)
            if (temp) return result = node.title + '/' + temp;
        });
        return result;
    }

    getPathById(target: string, array:any) {  
        var result: any;
        array?.map((node: any) =>{                          
            if (node.id === target) return result = node.id;
            if (node.children) {
                var temp = this.getPathById(target, node.children)
                if (temp) {
                    return result = node.id + '.' + temp;
                } 
            }
        });
        return result;
    }

    getArrayJson() {
        return treeToList(this.getJson(), 'children')
    }
}