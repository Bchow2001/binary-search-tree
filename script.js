const prettyPrint = (node, prefix = "", isLeft = true) => {
	if (node === null) {
		return;
	}
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
	}
	console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
	}
};

const nodeFactory = (value, left = null, right = null) => {
	return { value, left, right };
};

const buildTree = (arr, start = 0, end = arr.length - 1) => {
	if (start > end) {
		return null;
	}
	let mid = parseInt((start + end) / 2);
	let node = nodeFactory(arr[mid]);
	node.left = buildTree(arr, start, mid - 1);
	node.right = buildTree(arr, mid + 1, end);
	return node;
};

const treeFactory = (arr) => {
	newArr = [...new Set(arr)].sort();

	let root = buildTree(newArr);

	const inOrder = (node = root) => {
		if (node !== null) {
			inOrder(node.left);
			console.log(node.value);
			inOrder(node.right);
		}
	};

	const insertNode = (value, node = root) => {
		if (node == null) {
			node = nodeFactory(value);
			return node;
		}
		if (value < node.value) {
			node.left = insertNode(value, node.left);
		} else if (value > node.value) {
			node.right = insertNode(value, node.right);
		}
		return node;
	};

	const deleteNode = (value, node = root) => {
		if (node === null) {
			return node;
		}
		if (node.value > value) {
			node.left = deleteNode(value, node.left);
			return node;
		} else if (node.value < value) {
			node.right = deleteNode(value, node.right);
			return node;
		}
		if (node.left === null) {
			let temp = node.right;
			delete node;
			return temp;
		} else if (root.right === null) {
			let temp = node.right;
			delete node;
			return temp;
		} else {
			let succParent = node;
			let succ = node.right;
			while (succ.left !== null) {
				succParent = succ;
				succ = succ.left;
			}
			if (succParent !== node) {
				succParent.left = succ.right;
			} else {
				succParent.right = succ.right;
			}
			node.value = succ.value;
			delete succ;
			return node;
		}
	};

	const findNode = (value, node = root) => {
		if (node == null) {
			return null;
		}
		if (node.value === value) {
			return node;
		}
		if (node.value > value) {
			return findNode(value, node.left);
		} else if (node.value < value) {
			return findNode(value, node.right);
		}
	};

	const levelOrder = (func, node = root) => {
		travelOrder = [node];
		if (func == null) {
			arr = [];
			func = arr.push[node];
		}
	};

	return { root, insertNode, deleteNode, findNode };
};

arr = [2, 1, 3, 4, 6, 5, 7];
let t = treeFactory(arr);
t.insertNode(-1);
t.insertNode(-2);
t.insertNode(8);
t.insertNode(9);
prettyPrint(t.findNode(-10));

prettyPrint(t.root);
