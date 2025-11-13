## Für das arbeiten mit branches
[working with branches]([url](https://gist.github.com/albert-wissigkeit/ae824b85a3b6629db33379c9344d8ba9))

# **Merge branches Step-by-Step**:

- fetch all remotes
- git checkout <branch-name> (branche we want to be merged)
- git merge merge-branch (merge the current branch with the merge branch)
- git push origin/merge-branch (to push the changes)

## **Example commands**:

- ``git fetch --all``
- ``git checkout tim``
- ``git pull origin/tim (not necessary)``
- ``git merge merge-branch``
- ``git push origin/tim``

### **Squash merge commits**:

``git merge --squash <banch-name>``
``git comit -m "cutout merged lines"``

### Extra for multiple branches (not recommended):
``*for b in branch1 branch2 branch3; do
  git merge $b
done*``
