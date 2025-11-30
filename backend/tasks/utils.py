def detect_cycle(tasks):
    graph = {i: t.get("dependencies", []) for i, t in enumerate(tasks)}
    visited = set()
    stack = []

    def dfs(node):
        if node in stack:
            idx = stack.index(node)
            return stack[idx:] + [node]

        if node in visited:
            return None

        visited.add(node)
        stack.append(node)

        for neighbour in graph[node]:
            if 0 <= neighbour < len(tasks):
                cycle = dfs(neighbour)
                if cycle:
                    return cycle

        stack.pop()
        return None

    for n in graph:
        cycle = dfs(n)
        if cycle:
            return cycle

    return None
