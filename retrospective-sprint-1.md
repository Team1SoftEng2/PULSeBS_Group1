RETROSPECTIVE (Team 1)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs done: 3 - 0 
- Total points committed vs done: 13 - 0
- Nr of hours planned vs spent (as a team): 72 - 67

**Remember**  a story is done ONLY if it fits the Definition of Done:
 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD 

### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _#0_   |   11    |   -    |   1d       |  1d 1h 5m    |
| _#1_   |    6    |   5    |   1d 4h    |  1d 5h 45m   |
| _#2_   |    3    |   5    |   6h       |   5h 45m     |
| _#3_   |    3    |   3    |   7h       |   6h 35m     |
   

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task (average, standard deviation): average 2h 58m, standard deviation 6h 37m

- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent from previous table: 65/67.17 = 0.97
  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated:  6h
  - Total hours spent: 4.5h
  - Nr of automated unit test cases:  8 for now
  - Coverage (if available): 
- E2E testing:
  - Total hours estimated: 2h 
  - Total hours spent: 3h
- Code review 
  - Total hours estimated: 4h
  - Total hours spent: 3h
- Technical Debt management:
  - Total hours estimated: 1h 
  - Total hours spent: 50m
  - Hours estimated for remediation by SonarQube: ~1h
  - Hours spent on remediation: 20m 
  - debt ratio (as reported by SonarQube under "Measures-Maintainability"): 0.1%
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability ):
  Reliability -> A
  Security -> A
  Maintainability -> A

## ASSESSMENT

- What caused your errors in estimation (if any)?
 Overestimation of knowledge by some members of the group
 
- What lessons did you learn (both positive and negative) in this sprint?
 Sometimes brief meetinigs can be substituted by some messages if it is difficult to organize them.

- Which improvement goals set in the previous retrospective were you able to achieve? 
  Improve communication and better description of tasks
  
- Which ones you were not able to achieve? Why?
 Better self-assignment of the tasks is not achieved due to overestimation of knowledge by some members of the group

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
Better coordination in the team, uniform amount of hours of work between team members, self-assigned tasks have to be completed individually 

> Propose one or two

- One thing you are proud of as a Team!!
 We build better quality software than before
