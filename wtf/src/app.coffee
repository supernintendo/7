class Container
    constructor: ->
        @surface = d3
            .select 'body'
            .append 'svg'
            .attr 'width', 300
            .attr 'height', 300
        @resizeContainer()

    resizeContainer: ->
        @surface
            .attr 'width', window.innerWidth
            .attr 'height', window.innerHeight

class Tree
    constructor: (@container, @spec) ->
        @branches = []
        @counter = 0
        @done = false

    branchFrom: (lastBranch, direction) ->
        branch =
            x: lastBranch.x2
            y: lastBranch.y2
            x2: lastBranch.x2 - (@spec.branchLength * Math.cos(Math.PI * @spec.branchAngle/180)) * direction
            y2: lastBranch.y2 - @spec.branchLength * Math.sin(Math.PI * @spec.branchAngle/180)
            color: randomColor()
            lineCap: 'round'
            width: @spec.branchWidth
            speed: @spec.growSpeed
            ease: @spec.ease

    branchOff: (lastBranch)  ->
        if @counter <= @spec.totalLength
            @grow @branchFrom(lastBranch, @spec.divergence)
            @grow @branchFrom(lastBranch, @spec.divergence * -1)
            @counter += 1
            @spec.branchAngle -= 15
        else
            if not @done
                growTree()
                @done = true

    drawBranch: (index) ->
        branch = @branches[index]

        @container.surface
            .append 'line'
            .attr 'class', 'branch'
            .attr 'x1', branch.x
            .attr 'y1', branch.y
            .attr 'x2', branch.x
            .attr 'y2', branch.y
            .attr 'stroke', branch.color
            .attr 'stroke-linecap', branch.lineCap
            .attr 'stroke-linejoin', 'round'
            .attr 'stroke-width', branch.width
            .transition()
            .duration branch.speed
            .ease branch.ease
            .attr 'x2', branch.x2
            .attr 'y2', branch.y2
            .each 'end', @branchOff.bind(@, branch)

    grow: (branch) ->
        @newBranch(branch)
        @drawBranch(@branches.length - 1)

    newBranch: (spec) ->
        @branches.push spec

    stump: ->
        stump =
            x: @spec.x
            y: @spec.y
            x2: @spec.x
            y2: @spec.y - 60
            color: randomColor()
            lineCap: 'square'
            width: @spec.stumpWidth
            speed: @spec.growSpeed
            ease: 'cubic'
        stump

x_poses = []
y_poses = []

eases = [
    'linear',
    'quad',
    'cubic',
    'exp'
]
treeCount = 0
randomTree = (x, y) ->
    tree =
        branchAngle: Math.random() * 40 * -1 + 45
        branchLength: Math.random() * 180
        branchWidth: 1
        divergence: 1
        ease: eases[Math.floor(Math.random() * eases.length)]
        growSpeed: Math.random() * 1000 + 50
        stumpWidth: 1
        totalLength: Math.random() * 300 + 30
        x: x
        y: y

growTree = ->
    if treeCount < 10
        tree = new Tree(container, randomTree(x_poses[treeCount], y_poses[treeCount]))
        tree.grow tree.stump()
        treeCount += 1

reset = ->
    branches = document.getElementsByClassName 'branch'
    branches[0].parentElement.removeChild(branches[0]) while branches[0]
    startGrowing()

startGrowing = ->
    container.resizeContainer()
    x_poses = [1..4].map (i) -> Math.random() * window.innerWidth
    y_poses = [1..4].map (i) -> Math.random() * window.innerHeight + 120
    y_poses = y_poses.sort (a, b) -> a - b
    treeCount = 0
    growTree()

window.addEventListener 'resize', reset

# Grow trees
container = new Container
startGrowing()
setInterval reset, 8000
