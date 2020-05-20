# Autoclose

Firefox addon to close every new tab with unknown domain.

ex:

- open `foo.com` and `bar.com` tabs
- enable the addon by clicking on its icon
- open a new tab and try to go to
	- `fail.com` -> auto close
	- `foo.com` -> success
	- `bar.com` -> success
	- `any-subdomain.foo.com/any/path` -> success

note: `google.com` and `mozilla.org` are permanently white listed.

## Build

```bash
cd src && zip -r -FS ../autoclose.zip . && cd ..
```

## Todo

- addon config page to define a permanent white list
- better icon
