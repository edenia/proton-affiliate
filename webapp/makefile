include ../utils/meta.mk ../utils/help.mk

LATEST_TAG ?= latest

build-docker: ##@devops Build the docker image
build-docker: ./Dockerfile
	echo "Building containers..."
	@docker pull $(DOCKER_REGISTRY)/$(IMAGE_NAME_WEBAPP):$(LATEST_TAG) || true
	@docker build \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME_WEBAPP):$(VERSION) --target run-stage \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME_WEBAPP):$(LATEST_TAG) --target run-stage \
		--build-arg react_app_version="$(REACT_APP_VERSION)" \
		--build-arg react_app_name="$(REACT_APP_NAME)" \
		--build-arg react_app_title="$(REACT_APP_TITLE)" \
		--build-arg react_app_logo="$(REACT_APP_LOGO)" \
		--build-arg react_app_footer_links="$(REACT_APP_FOOTER_LINKS)" \
		--build-arg react_app_ual_app_name="$(REACT_APP_UAL_APP_NAME)" \
		--build-arg react_app_ual_api_protocol="$(REACT_APP_UAL_API_PROTOCOL)" \
		--build-arg react_app_ual_api_host="$(REACT_APP_UAL_API_HOST)" \
		--build-arg react_app_ual_api_port="$(REACT_APP_UAL_API_PORT)" \
		--build-arg react_app_ual_chain_id="$(REACT_APP_UAL_CHAIN_ID)" \
		--build-arg react_app_hasura_url="$(REACT_APP_HASURA_URL)" \
		--build-arg react_app_block_explorer_url="$(REACT_APP_BLOCK_EXPLORER_URL)" \
		--build-arg REACT_APP_AFFILIATE_ACCOUNT="$(REACT_APP_AFFILIATE_ACCOUNT)" \
		.

pull-image: ##@devops Pull the latest image from registry for caching
pull-image:
	@docker pull $(DOCKER_REGISTRY)/$(IMAGE_NAME_WEBAPP):$(LATEST_TAG) || true

build-docker-cached: ##@devops Build the docker image using cached layers
build-docker-cached: ./Dockerfile
	@docker build \
		--target prod-stage \
		--cache-from $(DOCKER_REGISTRY)/$(IMAGE_NAME_WEBAPP):$(LATEST_TAG) \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME_WEBAPP):$(VERSION) \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME_WEBAPP):$(LATEST_TAG) \
		.

push-image: ##@devops Push the freshly built image and tag with release or latest tag
push-image:
	@docker push $(DOCKER_REGISTRY)/$(IMAGE_NAME_WEBAPP):$(VERSION)
