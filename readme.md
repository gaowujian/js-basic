# Debian-based distributions

```
curl -s -L https://nvidia.github.io/nvidia-container-runtime/gpgkey | \
  sudo apt-key add -
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
curl -s -L https://nvidia.github.io/nvidia-container-runtime/$distribution/nvidia-container-runtime.list | \
  sudo tee /etc/apt/sources.list.d/nvidia-container-runtime.list
sudo apt-get update
```

## For pre-releases, you need to enable the experimental repos of all dependencies:

```
sudo sed -i -e '/experimental/ s/^#//g' /etc/apt/sources.list.d/nvidia-container-runtime.list
sudo apt-get update
```

## To later disable the experimental repos of all dependencies, you can run:

```
sudo sed -i -e '/experimental/ s/^/#/g' /etc/apt/sources.list.d/nvidia-container-runtime.list
sudo apt-get update
```

# Updating repository keys

## in order to update the nvidia-container-runtime repository key for your distribution, follow the instructions below.

## Debian-based distributions

```
url -s -L https://nvidia.github.io/nvidia-container-runtime/gpgkey | \
  sudo apt-key add -
```
