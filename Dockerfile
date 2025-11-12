#syntax=docker/dockerfile:1

# react stage is platform independent
FROM --platform=$BUILDPLATFORM node:25-alpine AS react

WORKDIR /app

COPY react/package.json react/package-lock.json ./
RUN npm install

COPY react/ ./

RUN npm run build


# pin stage platform and use golang's toolchain
FROM --platform=$BUILDPLATFORM golang:1.25-alpine AS pocketbase

WORKDIR /app

COPY pocketbase/go.mod pocketbase/go.sum ./
RUN go mod download

COPY pocketbase/ ./
COPY --from=react /app/dist /app/pb_public

RUN CGO_ENABLED=0 GOOS=$TARGETOS GOARCH=$TARGETARCH go build -o pocketbase main.go


FROM scratch

WORKDIR /app

COPY --from=pocketbase /app/pocketbase /app/pocketbase

CMD ["/app/pocketbase", "serve", "--http=0.0.0.0:8090"]

EXPOSE 8090
