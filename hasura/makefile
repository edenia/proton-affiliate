include ../utils/meta.mk ../utils/help.mk

LATEST_TAG ?= latest

build-docker: ##@devops Build the docker image
build-docker: ./Dockerfile
	@docker pull $(DOCKER_REGISTRY)/$(IMAGE_NAME_HASURA):$(VERSION) || true
	@docker build \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME_HASURA):$(VERSION) \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME_HASURA):$(LATEST_TAG) \
		.

pull-image: ##@devops Pull the latest image from registry for caching
pull-image:
	@docker pull $(DOCKER_REGISTRY)/$(IMAGE_NAME_HASURA):$(LATEST_TAG) || true

build-docker-cached: ##@devops Build the docker image using cached layers
build-docker-cached: ./Dockerfile
	@docker build \
		--cache-from $(DOCKER_REGISTRY)/$(IMAGE_NAME_HASURA):$(LATEST_TAG) \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME_HASURA):$(VERSION) \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME_HASURA):$(LATEST_TAG) \
		.

push-image: ##@devops Push the freshly built image and tag with release or latest tag
push-image:
	@docker push $(DOCKER_REGISTRY)/$(IMAGE_NAME_HASURA):$(VERSION)
