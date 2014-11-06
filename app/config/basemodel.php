<?php
/*
 * NOTE: model classes could also extend from a base class of its own. It won't be necessary for all model classes,
 * but in some projects most of your models may need something in common, like database access
*/

abstract class BaseModel {
    protected $database;
    public function __construct() {
        $this->database = new PDO("mysql:host=localhost;dbname=test", "username", "password");
    }
}

/*
 * If a model class extends from this class, it will have access to the database from $this->database.
 * The usefulness of this can obviously be extended to a lot more than just database access though - you could
 * create an instance of a validator class for common validation patterns across models (e.g. email), a
 * sanitation class for models to easily clean any input data, and so on.
 */