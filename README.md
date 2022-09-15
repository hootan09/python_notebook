## ToDO:

##### Create env and Activate it
```sh
$ python -m venv myenv

$ ./myenv/Scripts/activate
```

##### Install Jupyter and other packages
```sh
$ pip install jupyter numpy pandas
$ pip freeze > requirements.txt # add package into requirements.txt (for install python -r requirements.txt)
```

###### Add a new kernel to your Jupyter config
```sh
# Add this package if not present: pip install ipykernel
$ ipython kernel install --user --name=your_env_name
```

##### Run
```sh
$ jupyter-notebook
```

#### install package inside Jupyter-notebook cell
```sh
! pip install numpy
```

#### Access Jupyter from Server
```sh
#!/usr/bin/bash

#Set Password to jupyter
#jupyter notebook password

jupyter notebook --ip 0.0.0.0 --port 8888
```
