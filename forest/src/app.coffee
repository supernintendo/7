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
    constructor: (@container, @originX, @originY, @branchAngle, @branchLength, @totalLength) ->
        @branches = []
        @counter = 0

    branchOff: (lastBranch)  ->
        if @counter <= @totalLength
            @grow {
                x: lastBranch.x2
                y: lastBranch.y2
                x2: lastBranch.x2 + @branchLength * -Math.cos(Math.PI * @branchAngle/180)
                y2: lastBranch.y2 + @branchLength * -Math.sin(Math.PI * @branchAngle/180)
                color: 'green'
                width: 10
                speed: 200
                ease: 'linear'            
            }
            @grow {
                x: lastBranch.x2
                y: lastBranch.y2
                x2: lastBranch.x2 - @branchLength * -Math.cos(Math.PI * @branchAngle/180)
                y2: lastBranch.y2 + @branchLength * -Math.sin(Math.PI * @branchAngle/180)
                color: 'green'
                width: 10
                speed: 200
                ease: 'linear'   
            }
            @counter += 1

    drawBranch: (index) ->
        branch = @branches[index]

        @container.surface
            .append 'line'
            .attr 'x1', branch.x
            .attr 'y1', branch.y
            .attr 'x2', branch.x
            .attr 'y2', branch.y
            .attr 'stroke', branch.color
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
            x: @originX
            y: @originY
            x2: @originX
            y2: @originY - 40
            color: 'brown'
            width: 10
            speed: 400
            ease: 'cubic'
        stump

random = (upper) -> Math.random() * upper
randomPos = -> [random(window.innerWidth), random(window.innerHeight)]

container = new Container
[x, y] = randomPos()
tree = new Tree(container, x, y, 45, 20, 14)
tree.grow tree.stump()
