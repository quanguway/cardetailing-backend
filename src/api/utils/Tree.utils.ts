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
          console.log(node);
          
          if (node?.id === id) return node
          node?.children && stack.push(...node.children)
        }
        return null
    } 

    getPathByTitle(title: string, array = this.treeData) {
        console.log(this.treeData[0].children);
        
        var result;
        array?.map((node) => {   
            // console.log(node.title);
            // console.log("---------" + title);
             
                                                                                   
            if (node.title === title) return result = node.title;
            var temp = this.getPathByTitle(title, node.children)
            if (temp) return result = node.title + '.' + temp;
        });
        return result;
    }

    getArrayJson() {
        return treeToList(this.getJson(), 'children')
    }
}