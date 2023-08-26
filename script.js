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
	newArr = [...new Set(arr)].sort(function (a, b) {
		return a - b;
	});

	let root = buildTree(newArr);

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
		travelQueue = [node];
		const travelFunc = () => {
			while (travelQueue.length != 0) {
				if (travelQueue[0].left != null) {
					travelQueue.push(travelQueue[0].left);
				}
				if (travelQueue[0].right != null) {
					travelQueue.push(travelQueue[0].right);
				}
				func(travelQueue.shift().value);
			}
		};
		if (func == undefined) {
			let arr = [];
			func = (a) => {
				arr.push(a);
				return arr;
			};
			travelFunc();
			return arr;
		} else {
			return travelFunc();
		}
	};

	const preOrder = (func, node = root) => {
		const preOrderRecurse = () => {
			if (node == null) {
				return;
			} else {
				func(node.value);
				preOrder(func, node.left);
				preOrder(func, node.right);
			}
		};
		if (func == undefined) {
			let arr = [];
			func = (a) => {
				arr.push(a);
				return arr;
			};
			preOrderRecurse();
			return arr;
		} else {
			return preOrderRecurse();
		}
	};

	const inOrder = (func, node = root) => {
		const inOrderRecurse = () => {
			if (node == null) {
				return;
			} else {
				inOrder(func, node.left);
				func(node.value);
				inOrder(func, node.right);
			}
		};
		if (func == undefined) {
			let arr = [];
			func = (a) => {
				arr.push(a);
				return arr;
			};
			inOrderRecurse();
			return arr;
		} else {
			return inOrderRecurse();
		}
	};

	const postOrder = (func, node = root) => {
		const postOrderRecurse = () => {
			if (node == null) {
				return;
			} else {
				postOrder(func, node.left);
				postOrder(func, node.right);
				func(node.value);
			}
		};
		if (func == undefined) {
			let arr = [];
			func = (a) => {
				arr.push(a);
				return arr;
			};
			postOrderRecurse();
			return arr;
		} else {
			return postOrderRecurse();
		}
	};

	const height = (value) => {
		const findHeight = (node) => {
			if (node == null) {
				return -1;
			} else {
				let lHeight = findHeight(node.left);
				let rHeight = findHeight(node.right);
				if (lHeight > rHeight) {
					return lHeight + 1;
				} else {
					return rHeight + 1;
				}
			}
		};
		return findHeight(findNode(value));
	};

	const depth = (value, node = root) => {
		if (node == null) {
			return -1;
		}
		let totalDepth = -1;
		if (
			node.value == value ||
			(totalDepth = depth(value, node.left)) >= 0 ||
			(totalDepth = depth(value, node.right)) >= 0
		) {
			return totalDepth + 1;
		}
	};

	const isBalanced = (node = root) => {
		let lSubDepth = height(node.left.value);
		let rSubDepth = height(node.right.value);
		if (Math.abs(lSubDepth - rSubDepth) <= 1) {
			return true;
		} else {
			return false;
		}
	};

	const rebalance = () => {
		let arr = preOrder().sort(function (a, b) {
			return a - b;
		});
		root = treeFactory(arr);
		return root;
	};

	return {
		newArr,
		root,
		insertNode,
		deleteNode,
		findNode,
		levelOrder,
		preOrder,
		inOrder,
		postOrder,
		height,
		depth,
		isBalanced,
		rebalance,
	};
};

const driver = () => {
	arr = Array.from({ length: 100 }, () => Math.floor(Math.random() * 100));
	let t = treeFactory(arr);
	console.log(t.isBalanced());
	console.log(t.levelOrder());
	console.log(t.preOrder());
	console.log(t.inOrder());
	console.log(t.postOrder());
	t.insertNode(111);
	t.insertNode(123);
	t.insertNode(125);
	t.insertNode(215);
	t.insertNode(412);
	t.insertNode(193);
	console.log(t.isBalanced());
	t = t.rebalance();
	console.log(t.isBalanced());
	console.log(t.levelOrder());
	console.log(t.preOrder());
	console.log(t.postOrder());
	console.log(t.inOrder());
};

driver();
