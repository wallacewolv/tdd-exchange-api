<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description
API for currency conversion

## Endpoints

```bash
# GET
$ /exchange/?from=USD&to=BRL&amount=5

# GET
$ /currencies/USD/

# POST
$ /currencies/
{
  currency=USD,
  valure=1
}

# PATCH
$ /currencies/BRL/value
{
  value=0.2
}

# DELETE
$ /currencies/EUR/
```

## License

Nest is [MIT licensed](LICENSE).
